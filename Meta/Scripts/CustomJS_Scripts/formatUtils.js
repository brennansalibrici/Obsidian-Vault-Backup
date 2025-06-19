  class FormatUtils {
    // PURPOSE: Centralized source for formatting variable types across Obsidian

    // DATE & TIME FORMATS
    db_formatDateTime(dateObj) {
      const momentObj = window.moment(dateObj ?? new Date());
      return momentObj.format("YYYY-MM-DD HH:mm");
    }

    db_formatDateOnly(dateObj) {
      const momentObj = window.moment(dateObj ?? new Date());
      return momentObj.format("YYYY-MM-DD");
    }

    formatTimeOnly(dateObj) {
      const momentObj = window.moment(dateObj ?? new Date());
      return momentObj.format("HH:mm");
    }

    test(){
      console.log("FormatUtils Test","Test, test");
    }
  }

