interface BaseCarTS {
  showCost(): void;
}

class MastodonCarTS implements BaseCarTS {
  showCost(): void {
    console.log("Mastodon Car Cost: 300.000$");
  }
}

class RhinoCarTS implements BaseCarTS {
  showCost(): void {
    console.log("Rhino Car Cost: 500.000$");
  }
}

interface CarFactoryTS {
  makeCar(): BaseCarTS;
}

class MastodonCarFactoryTS implements CarFactoryTS {
  makeCar(): BaseCarTS {
    return new MastodonCarTS();
  }
}

class RhinoCarFactoryTS implements CarFactoryTS {
  makeCar(): BaseCarTS {
    return new RhinoCarTS();
  }
}

function appFactoryTS(factory: CarFactoryTS) {
  const car: BaseCarTS = factory.makeCar();
  car.showCost();
}

// appFactoryTS(new MastodonCarFactoryTS());
// appFactoryTS(new RhinoCarFactoryTS());

type FactoryTypeTS = "mastodon" | "rhino";
function createFactoryTS(type: FactoryTypeTS) {
  const factories = {
    mastodon: MastodonCarFactoryTS,
    rhino: RhinoCarFactoryTS,
  };

  const factoryClass = factories[type];
  return new factoryClass();
}

appFactoryTS(createFactoryTS("mastodon"));
appFactoryTS(createFactoryTS("rhino"));