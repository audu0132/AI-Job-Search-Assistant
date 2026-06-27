import mongoose, { Document } from "mongoose";
export interface IExperience {
    company: string;
    title: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
}
export interface IEducation {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
}
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone?: string;
    role: "user" | "admin";
    profilePicture?: string;
    skills: string[];
    experience: IExperience[];
    education: IEducation[];
    location?: string;
    resumeUrl?: string;
    linkedInUrl?: string;
    gitHubUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map