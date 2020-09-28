import { Service } from "typedi";
import AdminRepository from "@repository/admin.repository";
import Admin from '@models/admin';
import TeacherService from "./teacher.service";
import CustomError from "@lib/errors/customError";
import errors from '@lib/errors';
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export default class AdminService {

  constructor(
    @InjectRepository()
    private readonly adminRepository: AdminRepository,
    private readonly teacherService: TeacherService,
  ) { }

  public getAdmin = async (email: string): Promise<Admin> => {
    const teacher = await this.teacherService.getTeacher(email);

    if (teacher === null) {
      throw new CustomError(errors.NoMember);
    }

    const admin = await this.adminRepository.getAdminByTeacher(teacher);
    if (admin === undefined) {
      return null;
    }

    return admin;
  }

  public getAdminByTeacherIdx = async (teacherIdx: number): Promise<Admin | null> => {
    const teacher = await this.teacherService.getTeacherByIdx(teacherIdx);

    if (teacher === null) {
      throw new CustomError(errors.NoTeacher);
    }

    const admin = await this.adminRepository.findOne(teacher.idx);
    if (admin === undefined) {
      return null;
    }

    return admin;
  }
}