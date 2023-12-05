type AvailableColors = "red" | "black" | "gray" | "default";
type EditionsType = "cvt" | "signature" | "default";
type EngineType = "electric" | "gasoline" | "diesel";
type CarConstructorParams = {
  edition: EditionsType;
  model: string;
  airBags: number;
  color: AvailableColors;
  engine: EngineType;
};
abstract class CarTS {
  private _edition: EditionsType;
  private _model: string;
  private _airBags: number;
  private _color: AvailableColors;
  private _engine: EngineType;

  constructor({
    edition,
    model,
    airBags,
    color,
    engine,
  }: CarConstructorParams) {
    this._edition = edition || "default";
    this._model = model || "";
    this._airBags = airBags || 0;
    this._color = color || "default";
    this._engine = engine || "gasoline";
  }

  set airBags(howMany: number) {
    this._airBags = howMany;
  }

  set color(color: AvailableColors) {
    this._color = color;
  }

  set model(model: string) {
    this._model = model;
  }

  set edition(edition: "cvt" | "signature" | "default") {
    this._edition = edition;
  }

  set engine(type: EngineType) {
    this._engine = type;
  }

  get airBags() {
    return this._airBags;
  }

  get color() {
    return this._color;
  }

  get model() {
    return this._model;
  }

  get edition() {
    return this._edition;
  }

  get engine() {
    return this._engine;
  }

  abstract clone(): CarTS;
}

class MastodonCarTS extends CarTS {
  constructor(carToClone?: MastodonCarTS);
  constructor(carToClone: MastodonCarTS) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
      engine: carToClone?.engine,
    });
  }

  clone(): MastodonCarTS {
    return new MastodonCarTS(this);
  }
}

class RhinoCarTS extends CarTS {
  constructor(carToClone?: RhinoCarTS);
  constructor(carToClone: RhinoCarTS) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
      engine: carToClone?.engine,
    });
  }

  clone(): RhinoCarTS {
    return new RhinoCarTS(this);
  }
}

class DirectorTS {
  private productionLine!: CarProductionLineTS;

  setProductionLine(productionLine: CarProductionLineTS) {
    this.productionLine = productionLine;
  }

  constructCvtEdition() {
    this.productionLine.setAirBags(4);
    this.productionLine.setColor("red");
    this.productionLine.setEdition("CVT");
  }

  constructSignatureEdition() {
    this.productionLine.setAirBags(8);
    this.productionLine.setColor("gray");
    this.productionLine.setEdition("signature");
  }
}

interface CarProductionLineTS {
  setAirBags(howMany: number): void;
  setColor(color: AvailableColors): void;
  setEdition(edition: string): void;
  resetProductionLine(car: CarTS): void;
}

type ConstructorParams = { factory: FactoryTS };
class SedanProductionLineTS implements CarProductionLineTS {
  private sedanCar!: CarTS;
  private carFactory!: FactoryTS;

  constructor({ factory }: ConstructorParams) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  resetProductionLine(car: CarTS): void {
    this.sedanCar = car;
  }

  setAirBags(howMany: number): SedanProductionLineTS {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLineTS {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition: EditionsType): SedanProductionLineTS {
    this.sedanCar.edition = edition;
    return this;
  }

  setModel(): SedanProductionLineTS {
    this.sedanCar.model = "sedan";
    return this;
  }

  setEngine(engine: EngineType): SedanProductionLineTS {
    this.sedanCar.engine = engine;
    return this;
  }

  build(): CarTS {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

interface FactoryTS {
  create(): CarTS;
}

class MastodonCarFactoryTS implements FactoryTS {
  create(): CarTS {
    return new MastodonCarTS();
  }
}

class RhinoCarFactoryTS implements FactoryTS {
  create(): CarTS {
    return new RhinoCarTS();
  }
}

function appBuilderTS(director: DirectorTS) {
  const mastodonSedanProductionLine = new SedanProductionLineTS({
    factory: new MastodonCarFactoryTS(),
  });
  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine
    .setEngine("diesel")
    .build();
  console.log(mastodonSedanCvt);
  const mastodonSedanCvtPrototype = mastodonSedanCvt.clone();
  console.log(mastodonSedanCvtPrototype);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);
  const mastodonSedanSignaturePrototype = mastodonSedanSignature.clone();
  console.log(mastodonSedanSignaturePrototype);

  const rhinoSedanProductionLine = new SedanProductionLineTS({
    factory: new RhinoCarFactoryTS(),
  });
  director.setProductionLine(rhinoSedanProductionLine);
  director.constructCvtEdition();
  const rhinoSedanCvt = rhinoSedanProductionLine.setEngine("electric").build();
  console.log(rhinoSedanCvt);
  const rhinoSedanCvtPrototype = rhinoSedanCvt.clone();
  console.log(rhinoSedanCvtPrototype);

  director.constructSignatureEdition();
  const rhinoSedanSignature = rhinoSedanProductionLine.build();
  console.log(rhinoSedanSignature);
  const rhinoSedanSignaturePrototype = rhinoSedanSignature.clone();
  console.log(rhinoSedanSignaturePrototype);
}

appBuilderTS(new DirectorTS());