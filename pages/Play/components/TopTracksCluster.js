class TopTracksCluster {
  constructor(page) {
    this.page = page;

    this.selectors = {
      container: '.cluster[data-type="sarts"]',
      showAllButton: '.more[role="button"]',
      loadingOverlay: '#loading-overlay',
    };
  }

  async isPresent() {
    let isPresent = true;
    try {
      // Will throw err if element is not present and visible.
      await this.page.waitForSelector(`${this.selectors.container}`, {
        visible: true,
        timeout: 200,
      });
    } catch (err) {
      isPresent = false;
    }
    return isPresent;
  }

  async showAll() {
    let isShowAllButtonVisible = true;
    try {
      // Will throw err if element is not present and visible.
      await this.page.waitForSelector(
        `${this.selectors.container} ${this.selectors.showAllButton}`,
        {
          visible: true,
          timeout: 200,
        }
      );
    } catch (err) {
      isShowAllButtonVisible = false;
    }
    if (!isShowAllButtonVisible) {
      return;
    }
    await this.page.click(this.selectors.showAllButton);
    await this.page.waitForSelector(this.selectors.showAllButton, { hidden: true });
    await this.page.waitForSelector(this.selectors.loadingOverlay, { hidden: true });
  }
}

module.exports = TopTracksCluster;
