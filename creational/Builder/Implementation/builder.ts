// General steps so as to build products

interface CarProductionLineTS {
  setAirBags(howMany: number): CarProductionLineTS;
  setColor(color: AvailableColors): CarProductionLineTS;
  setEdition(edition: string): CarProductionLineTS;
  resetProductionLine(): void;
}

// Concrete builders subclasses

type CarCatalog = "mastodon" | "rhino";
type ConstructorParams = { model: CarCatalog };
class SedanProductionLineTS implements CarProductionLineTS {
  private sedanCar!: CarTS;
  private internalModel!: CarCatalog;

  constructor({ model }: ConstructorParams) {
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(howMany: number): SedanProductionLineTS {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLineTS {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition: string): SedanProductionLineTS {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model: CarCatalog) {
    this.internalModel = model;
  }

  setModel() {
    this.sedanCar.model = "sedan";
  }

  resetProductionLine(): void {
    this.sedanCar =
      this.internalModel === "mastodon"
        ? new MastodonCarTS()
        : new RhinoCarTS();
  }

  build(): CarTS {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

class HatchbackProductionLineTS implements CarProductionLineTS {
  private hatchbackCar!: CarTS;
  private internalModel!: CarCatalog;

  constructor({ model }: ConstructorParams) {
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(howMany: number): HatchbackProductionLineTS {
    this.hatchbackCar.airBags = howMany;
    return this;
  }

  setColor(color: AvailableColors): HatchbackProductionLineTS {
    this.hatchbackCar.color = color;
    return this;
  }

  setEdition(edition: string): HatchbackProductionLineTS {
    this.hatchbackCar.edition = edition;
    return this;
  }

  setInternalModel(model: CarCatalog) {
    this.internalModel = model;
  }

  setModel() {
    this.hatchbackCar.model = "hatchback";
  }

  resetProductionLine(): void {
    this.hatchbackCar =
      this.internalModel === "mastodon"
        ? new MastodonCarTS()
        : new RhinoCarTS();
  }

  build(): CarTS {
    this.setModel();
    const hatchbackCar = this.hatchbackCar;
    this.resetProductionLine();
    return hatchbackCar;
  }
}

// Implement product classes, these ones could not belong to the same interface

type AvailableColors = "red" | "black" | "gray" | "blue";
class CarTS {
  private _edition!: string;
  private _model!: string;
  private _airBags: number = 2;
  private _color: AvailableColors = "black";

  set airBags(howMany: number) {
    this._airBags = howMany;
  }

  set color(color: AvailableColors) {
    this._color = color;
  }

  set edition(edition: string) {
    this._edition = edition;
  }

  set model(model: string) {
    this._model = model;
  }
}

class MastodonCarTS extends CarTS {
  constructor() {
    super();
  }
}

class RhinoCarTS extends CarTS {
  constructor() {
    super();
  }
}

// Implement director class

class DirectorTS {
  private productionLine!: CarProductionLineTS;

  setProductionLine(productionLine: CarProductionLineTS) {
    this.productionLine = productionLine;
  }

  constructCvtEdition(): void {
    this.productionLine.setAirBags(4).setColor("blue").setEdition("CVT");
  }

  constructSignatureEdition(): void {
    this.productionLine.setAirBags(8).setColor("gray").setEdition("Signature");
  }

  constructSportEdition(): void {
    this.productionLine.setAirBags(12).setColor("black").setEdition("Sport");
  }
}

function appBuilderTS(director: DirectorTS) {
  const mastodonSedanProductionLine = new SedanProductionLineTS({
    model: "mastodon",
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);

  director.constructSportEdition();
  const mastodonSedanSport = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSport);

  const mastodonHatchbackProductionLine = new HatchbackProductionLineTS({
    model: "mastodon",
  });

  director.setProductionLine(mastodonHatchbackProductionLine);
  director.constructCvtEdition();
  const mastodonHatchbackCvt = mastodonHatchbackProductionLine.build();
  console.log(mastodonHatchbackCvt);

  director.constructSignatureEdition();
  const mastodonHatchbackSignature = mastodonHatchbackProductionLine.build();
  console.log(mastodonHatchbackSignature);

  director.constructSportEdition();
  const mastodonHatchbackSport = mastodonHatchbackProductionLine.build();
  console.log(mastodonHatchbackSport);

  const rhinoSedanProductionLine = new SedanProductionLineTS({
    model: "rhino",
  });

  director.setProductionLine(rhinoSedanProductionLine);
  director.constructCvtEdition();
  const rhinoSedanCvt = rhinoSedanProductionLine.build();
  console.log(rhinoSedanCvt);

  director.constructSignatureEdition();
  const rhinoSedanSignature = rhinoSedanProductionLine.build();
  console.log(rhinoSedanSignature);

  director.constructSportEdition();
  const rhinoSedanSport = rhinoSedanProductionLine.build();
  console.log(rhinoSedanSport);

  const rhinoHatchbackProductionLine = new HatchbackProductionLineTS({
    model: "rhino",
  });

  director.setProductionLine(rhinoHatchbackProductionLine);
  director.constructCvtEdition();
  const rhinoHatchbackCvt = rhinoHatchbackProductionLine.build();
  console.log(rhinoHatchbackCvt);

  director.constructSignatureEdition();
  const rhinoHatchbackSignature = rhinoHatchbackProductionLine.build();
  console.log(rhinoHatchbackSignature);

  director.constructSportEdition();
  const rhinoHatchbackSport = rhinoHatchbackProductionLine.build();
  console.log(rhinoHatchbackSport);
}

appBuilderTS(new DirectorTS());