interface MastodonCarTS {
  useGPS(): void;
}

interface RhinoCarTS {
  useGPS(): void;
}

class MastodonSedanCarTS implements MastodonCarTS {
  useGPS(): void {
    console.log("[SEDAN] Mastodon GPS");
  }
}

class MastodonHatchbackCarTS implements MastodonCarTS {
  useGPS(): void {
    console.log("[HATCHBACK] Mastodon GPS");
  }
}
class RhinoSedanCarTS implements MastodonCarTS {
  useGPS(): void {
    console.log("[SEDAN] Rhino GPS");
  }
}

class RhinoHatchbackCarTS implements MastodonCarTS {
  useGPS(): void {
    console.log("[HATCHBACK] Rhino GPS");
  }
}

interface CarAbstractFactoryTS {
  createMastodon(): MastodonCarTS;
  createRhino(): RhinoCarTS;
}

class SedanCarFactoryTS implements CarAbstractFactoryTS {
  createMastodon(): MastodonCarTS {
    return new MastodonSedanCarTS();
  }

  createRhino(): RhinoCarTS {
    return new RhinoSedanCarTS();
  }
}

class HatchbackCarFactoryTS implements CarAbstractFactoryTS {
  createMastodon(): MastodonCarTS {
    return new MastodonHatchbackCarTS();
  }

  createRhino(): RhinoCarTS {
    return new RhinoHatchbackCarTS();
  }
}

function appCarFactoryTS(factory: CarAbstractFactoryTS) {
  const mastodon: MastodonCarTS = factory.createMastodon();
  const rhino: RhinoCarTS = factory.createRhino();

  mastodon.useGPS();
  rhino.useGPS();
}

// appCarFactoryTS(new HatchbackCarFactoryTS());
// appCarFactoryTS(new SedanCarFactoryTS());

type FactoryTypeTS = "sedan" | "hatchback";
function createFactoryTS(type: FactoryTypeTS): CarAbstractFactoryTS {
  const factories = {
    sedan: SedanCarFactoryTS,
    hatchback: HatchbackCarFactoryTS,
  };

  const Factory = factories[type];
  return new Factory();
}

appCarFactoryTS(createFactoryTS("hatchback"));
appCarFactoryTS(createFactoryTS("sedan"));