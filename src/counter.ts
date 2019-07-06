class Counter {
	private counter: number;
	constructor() {
		this.counter = 1;
	}
	increase() {
		this.counter++;
	}
	getCounter() {
		return this.counter;
	}
}

export const counter = new Counter();
