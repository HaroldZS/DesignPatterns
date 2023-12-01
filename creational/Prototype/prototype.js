class Car {
  constructor({ edition, model, airBags, color } = {}) {
    this._edition = edition || "default";
    this._model = model || "";
    this._airBags = airBags || 0;
    this._color = color || "default";
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  set model(model) {
    this._model = model;
  }

  set edition(edition) {
    this._edition = edition;
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

  clone() {
    throw new Error("Method not implemented!");
  }
}

class MastodonCar extends Car {
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
    });
  }

  clone() {
    return new MastodonCar(this);
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

  constructSportEdition() {
    this.productionLine.setAirBags(12).setColor("Black").setEdition("Sport");
  }
}

class CarProductionLine {
  setAirBags(howMany) {
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
  constructor({ factory }) {
    super();
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
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
    return this;
  }

  resetProductionLine(car) {
    this.sedanCar = car;
  }

  build() {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

class Factory {
  create() {
    throw new Error("Method not implemented!");
  }
}

class MastodonCarFactory extends Factory {
  create() {
    return new MastodonCar();
  }
}

function appBuilder(director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
    factory: new MastodonCarFactory(),
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodonSedanCvt);
  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log(mastodonSedanCvtClone);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);
  const mastodonSedanSignatureClone = mastodonSedanSignature.clone();
  console.log(mastodonSedanSignatureClone);

  director.constructSportEdition();
  const mastodonSedanSport = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSport);
  const mastodonSedanSportClone = mastodonSedanSport.clone();
  console.log(mastodonSedanSportClone);
}

appBuilder(new Director());
