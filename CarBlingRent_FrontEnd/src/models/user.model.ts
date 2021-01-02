export class UserModel {
    public constructor(
        public id?:number,
        public fullName?:string,
        public identityCard?:string,
        public userName?:string,
        public dateOfBirth?:Date,
        public gender?:string,
        public email?:string,
        public password?:string,
        public image?:File,
        public imageFileName?:string,
        public role?:string,
        public jwtToken?:string
        ) {
        

    }
}
