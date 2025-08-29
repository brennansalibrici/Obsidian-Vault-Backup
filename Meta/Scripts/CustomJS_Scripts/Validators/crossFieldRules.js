class CrossFieldRules {
  constructor() {
    this.EB = (window.customJS.createErrorBusInstance || window.customJS.createerrorBusInstance)?.({ module: "crossFieldRules" });
    this.rules = [];
  }

  static createInstance() {
    if (!window.customJS.CrossFieldRulesInstance) {
      window.customJS.CrossFieldRulesInstance = new CrossFieldRules();
    }
    return window.customJS.CrossFieldRulesInstance;
  }

  register(rule) {
    if (!rule?.id || typeof rule.check !== "function") {
      throw new Error("[CrossFieldRules] rule must have {id, check()}");
    }
    this.rules.push(rule);
    return this;
  }

  run({ data = {}, ctx = {} } = {}) {
    const issues = [];
    for (const r of this.rules) {
      try {
        if (typeof r.when === "function" && !r.when(data, ctx)) continue;
        const out = r.check(data, ctx) || [];
        for (const it of out) {
          issues.push({
            code: String(it?.code || r.id).toUpperCase(),
            message: it?.message || "Cross-field validation failed",
            path: Array.isArray(it?.path) ? it.path : undefined,
            fix: it?.fix,
            meta: it?.meta,
            rule: r.id,
          });
        }
      } catch (err) {
        this.EB?.toast?.(this.EB.err?.(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
          { where: `CrossFieldRules.${r.id}`, cause: String(err?.message || err) },
          { domain: this.EB.DOMAIN.PIPELINE }
        ), { ui: false, console: true });
      }
    }
    return { ok: issues.length === 0, issues };
  }

  // Declarative helpers
  static helpers = {
    requires({ ifField, truthy = true, require: reqField, message }) {
      return {
        id: `requires_${ifField}_then_${reqField}`,
        check(data) {
          const cond = truthy ? !!data[ifField] : !data[ifField];
          if (cond && (data[reqField] == null || String(data[reqField]).trim() === "")) {
            return [{
              code: "MISSING_FIELD",
              path: [reqField],
              message: message || `'{${reqField}}' is required when '{${ifField}}' is ${truthy ? "set" : "not set"}.`,
              fix: `Fill the '${reqField}' field.`,
            }];
          }
          return [];
        }
      };
    },

    mutuallyExclusive(a, b, { message } = {}) {
      return {
        id: `mutuallyExclusive_${a}_${b}`,
        check(data) {
          if (data[a] && data[b]) {
            return [{
              code: "FIELDS_MUTUALLY_EXCLUSIVE",
              path: [a, b],
              message: message || `'${a}' and '${b}' cannot both be provided.`,
              fix: `Remove either '${a}' or '${b}'.`,
            }];
          }
          return [];
        }
      };
    },

    oneOf(fields, { atLeast = 1, message } = {}) {
      return {
        id: `oneOf_${fields.join("_")}_atLeast_${atLeast}`,
        check(data) {
          const count = fields.reduce((n, k) => n + (!!data[k] ? 1 : 0), 0);
          if (count < atLeast) {
            return [{
              code: "AT_LEAST_ONE_REQUIRED",
              path: fields,
              message: message || `Provide at least ${atLeast} of: ${fields.join(", ")}.`,
              fix: `Fill any ${atLeast} of: ${fields.join(", ")}.`
            }];
          }
          return [];
        }
      };
    },

    implies({ a, b, message }) {
      return {
        id: `implies_${a}_to_${b}`,
        check(data) {
          if (data[a] && !data[b]) {
            return [{
              code: "IMPLIES_MISSING",
              path: [b],
              message: message || `'${b}' is required when '${a}' is set.`,
              fix: `Fill the '${b}' field.`,
            }];
          }
          return [];
        }
      };
    }
  }
}
