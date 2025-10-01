

const createCarObjecttoUpdate = (req) => {
    const { carName, Brand, makeYear, carType, carFeature, regYear,
        fuel, kmDriven, transmission, engineCapicity, auctionId } = req.body
    if (!carName && !Brand && !makeYear && !carType && !carFeature && !regYear && !fuel && !kmDriven && !transmission && !engineCapicity) {
        return { isInvalid: true }
    }
    let carToupdate = {}
    if (carName) {
        carToupdate.carName = carName
    }
    if (Brand) {
        carToupdate.Brand = Brand
    }
    if (makeYear) {
        carToupdate.makeYear = makeYear
    }
    if (carType) {
        carToupdate.carType = carType
    }
    if (carFeature) {
        carToupdate.carFeature = carFeature
    }
    if (regYear) {
        carToupdate.regYear = regYear
    }
    if (fuel) {
        carToupdate.fuel = fuel
    }
    if (kmDriven) {
        carToupdate.kmDriven = kmDriven
    }
    if (transmission) {
        carToupdate.transmission = transmission
    }
    if (engineCapicity) {
        carToupdate.engineCapicity = engineCapicity
    }
    return carToupdate
}

module.exports = {
    createCarObjecttoUpdate
}