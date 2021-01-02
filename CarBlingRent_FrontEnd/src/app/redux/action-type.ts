export enum ActionType {
    Register,
    Login,
    Logout,

    GetAllManufacturers,
    GetAllUsers,
    GetAllBranches,
    GetAllCarFleet,
    GetAllCarRental,
    GetAllOrders,

    AddManufacturer,
    AddBranch,
    AddCarToFleet,
    AddCarToRental,
    AddOrder,

    UpdateManufacturer,
    UpdateUser,
    UpdateCarFleet,
    UpdateCarRental,
    UpdateOrder,

    DeleteManufacturer,

    GotError
}