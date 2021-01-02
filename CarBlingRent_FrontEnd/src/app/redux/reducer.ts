import { environment } from 'src/environments/environment';
import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';
import { Notyf } from 'notyf';
import { NotificationService } from '../services/notification.service';

const notyf = new Notyf({
    duration: 5000, ripple: false
});

const notificationService: NotificationService = new NotificationService();
export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState };

    switch (action.type) {
        case ActionType.Register: {
            action.payload.imageFileName = environment.baseUrl+"/auth/images/" + action.payload.imageFileName;
            newState.users.push(action.payload);
            notificationService.success("The registration was successful !");
            newState.user = action.payload;
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;
        }

        case ActionType.GetAllUsers: {
            for (const user of action.payload) {
                user.imageFileName = environment.baseUrl+"/auth/images/" + user.imageFileName;
            }
            newState.users = action.payload;
            break;
        }

        case ActionType.Login: {
            newState.user = action.payload;
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;
        }

        case ActionType.Logout: {
            newState.user = null;
            sessionStorage.removeItem("user");
            break;
        }

        case ActionType.GetAllManufacturers: {
            newState.manufacturers = action.payload;
            break;
        }
        case ActionType.GetAllOrders: {
            newState.orders = action.payload;
            break;
        }

        case ActionType.GetAllBranches: {
            newState.branches = action.payload;
            break;
        }

        case ActionType.GetAllCarFleet: {
            newState.carFleet = action.payload;
            break;
        }

        case ActionType.GetAllCarRental: {
            for (const oneCarInRental of action.payload) {
                oneCarInRental.imageFileName = environment.baseUrl+"/carrental/images/" + oneCarInRental.imageFileName;
            }
            newState.carRental = action.payload;
            break;
        }

        case ActionType.AddManufacturer: {
            newState.manufacturers.push(action.payload);
            notificationService.success("Manufacturer has been successfully added!")
            break;
        }

        case ActionType.AddOrder: {
            newState.orders.push(action.payload);
            notificationService.success("The car was successfully rented.");
            break;
        }

        case ActionType.AddBranch: {
            newState.branches.push(action.payload);
            notificationService.success("Branch has been successfully added");
            break;
        }

        case ActionType.AddCarToFleet: {
            newState.carFleet.push(action.payload);
            notificationService.success("The car has been successfully added to the cars fleet!")
            break;
        }

        case ActionType.AddCarToRental: {
            action.payload.imageFileName = environment.baseUrl+"/carfleet/images/" + action.payload.imageFileName;
            newState.carRental.push(action.payload);
            notificationService.success("The car has been successfully added to the cars rental!")
            break;
        }

        case ActionType.UpdateManufacturer: {
            const index = newState.manufacturers.findIndex(p => p.id === action.payload.id);
            newState.manufacturers[index] = action.payload;
            notificationService.success("Manufacturer updated successfully!");
            break;
        }

        case ActionType.UpdateOrder: {
            const index = newState.orders.findIndex(p => p.id === action.payload.id);
            newState.orders[index] = action.payload;
            notificationService.success("Order has been updated");
            break;
        }

        case ActionType.UpdateUser: {
            const index = newState.users.findIndex(u => u.id === action.payload.id);
            newState.users[index] = action.payload;
            notificationService.success("User has been updated");
            break;
        }

        case ActionType.UpdateCarFleet: {
            const index = newState.carFleet.findIndex(c => c.id === action.payload.id);
            newState.carFleet[index] = action.payload;
            notificationService.success("Car Fleet has been updated");
            break;
        }

        case ActionType.UpdateCarRental: {
            const index = newState.carRental.findIndex(c => c.id === action.payload.id);
            newState.carRental[index] = action.payload;
            break;
        }

        case ActionType.DeleteManufacturer: {
            const index = newState.manufacturers.findIndex(p => p.id === action.payload); // payload = id to delete
            newState.manufacturers.splice(index, 1);
            break;
        }

        case ActionType.GotError: {
            newState.lastError = getErrorMessage(action.payload);
            notyf.error(newState.lastError);
            break;
        }
    }
    return newState;
}

function getErrorMessage(errorObject) {

    if (typeof errorObject.error === "string") {
        return errorObject.error;
    }

    if (errorObject.status === 401 || errorObject.status === 403) {
        return "You are not authorized";
    }

    if (errorObject.status === 400) {
        return "Incorrect input,<br> please try again";
    }
    return "Some error occurred, please try again later";
}