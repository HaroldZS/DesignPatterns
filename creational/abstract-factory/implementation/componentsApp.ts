interface Cpu {
  setSeries(series: string): void;
}

interface Memory {
  setCapacityInGB(capacity: number): void;
}

interface Display {
  setResolution(): void;
}

class PhoneCpu implements Cpu {
  setSeries(series: string): void {
    console.log(`[Phone] CPU's series: ${series}`);
  }
}

class LaptopCpu implements Cpu {
  setSeries(series: string): void {
    console.log(`[Laptop] CPU's series: ${series}`);
  }
}

class TabletCpu implements Cpu {
  setSeries(series: string): void {
    console.log(`[Tablet] CPU series: ${series}`);
  }
}

class PhoneMemory implements Memory {
  setCapacityInGB(capacity: number): void {
    console.log(`[Phone] Memory capacity: ${capacity}`);
  }
}

class LaptopMemory implements Memory {
  setCapacityInGB(capacity: number): void {
    console.log(`[Laptop] Memory capacity: ${capacity}`);
  }
}

class TabletMemory implements Memory {
  setCapacityInGB(capacity: number): void {
    console.log(`[Tablet] Memory capacity: ${capacity}`);
  }
}

class PhoneDisplay implements Display {
  setResolution(): void {
    console.log(`[Phone] Display`);
  }
}

class LaptopDisplay implements Display {
  setResolution(): void {
    console.log(`[Laptop] Display`);
  }
}

class TabletDisplay implements Display {
  setResolution(): void {
    console.log(`[Tablet] Display`);
  }
}

interface componentAbstractFactory {
  createCpu(): Cpu;
  createMemory(): Memory;
  createDisplay(): Display;
}

class PhoneComponentFactory implements componentAbstractFactory {
  createCpu(): Cpu {
    return new PhoneCpu();
  }

  createMemory(): Memory {
    return new PhoneMemory();
  }

  createDisplay(): Display {
    return new PhoneDisplay();
  }
}

class LaptopComponentFactory implements componentAbstractFactory {
  createCpu(): Cpu {
    return new LaptopCpu();
  }

  createMemory(): Memory {
    return new LaptopMemory();
  }

  createDisplay(): Display {
    return new LaptopDisplay();
  }
}

class TabletComponentFactory implements componentAbstractFactory {
  createCpu(): Cpu {
    return new TabletCpu();
  }

  createMemory(): Memory {
    return new TabletMemory();
  }

  createDisplay(): Display {
    return new TabletDisplay();
  }
}

function appComponentFactory(
  factory: componentAbstractFactory,
  series: string,
  capacity: number
) {
  const cpu: Cpu = factory.createCpu();
  const memory: Memory = factory.createMemory();
  const display: Display = factory.createDisplay();

  cpu.setSeries(series);
  memory.setCapacityInGB(capacity);
  display.setResolution();
}

// appComponentFactory(new PhoneComponentFactory(), "X-Phone-Series", 15);
// appComponentFactory(new LaptopComponentFactory(), "Y-Laptop-Series", 23);
// appComponentFactory(new TabletComponentFactory(), "Z-Tablet-Series", 39);

type FactoryType = "phone" | "laptop" | "tablet";
function createFactory(type: FactoryType): componentAbstractFactory {
  const factories = {
    phone: PhoneComponentFactory,
    laptop: LaptopComponentFactory,
    tablet: TabletComponentFactory,
  };
  const Factory = factories[type];
  return new Factory();
}

appComponentFactory(createFactory("phone"), "X-Phone-Series", 15);
appComponentFactory(createFactory("laptop"), "Y-Laptop-Series", 23);
appComponentFactory(createFactory("tablet"), "Z-Tablet-Series", 39);