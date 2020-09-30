export function marquee({ parentElement: elem }, hover = false) {
    if (!hover && !elem.scrollIntervalId) {
        elem.scrollIntervalId = setInterval(function () {
            const scrollLeft = this.scrollLeft;
            this.scroll(this.scrollLeft + 3, 0);

            if (this.scrollLeft == scrollLeft && this.resetTO == null) {
                this.resetTO = setTimeout(() => {
                    this.scroll(0, 0);
                    this.resetTO = null;
                }, 1000);
            }

        }.bind(elem), 6);
    }
}