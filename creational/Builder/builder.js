class CarProductionLine {
  setAirBags(airBagsNumber) {
    throw new Error("Method not implemented!");
  }

  setColor(color) {
    throw new Error("Method not implemented!");
  }

  setEdition(edition) {
    throw new Error("Method not implemented!");
  }

  resetProductionLine() {
    throw new Error("Method not implemented!");
  }
}

class SedanProductionLine extends CarProductionLine {
  constructor({ model }) {
    super();
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model) {
    this.internalModel = model;
  }

  setModel() {
    this.sedanCar.model = "sedan";
  }

  resetProductionLine() {
    this.sedanCar =
      this.internalModel === "mastodon" ? new MastodonCar() : new RhinoCar();
  }

  build() {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

class Car {
  constructor() {
    this._edition = "";
    this._model = "";
    this._airBags = 2;
    this._color = "black";
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  set edition(edition) {
    this._edition = edition;
  }

  set model(model) {
    this._model = model;
  }
}

class MastodonCar extends Car {
  constructor() {
    super();
  }
}

class RhinoCar extends Car {
  constructor() {
    super();
  }
}

class Director {
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  constructCvtEdition() {
    this.productionLine.setAirBags(4).setColor("Blue").setEdition("CVT");
  }

  constructSignatureEdition() {
    this.productionLine.setAirBags(8).setColor("Red").setEdition("Signature");
  }
}

function appBuilder(director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
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

appBuilder(new Director());