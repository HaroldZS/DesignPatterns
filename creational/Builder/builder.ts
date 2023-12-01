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
}

appBuilderTS(new DirectorTS());