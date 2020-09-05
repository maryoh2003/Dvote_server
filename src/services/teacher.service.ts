import { Service } from "typedi";
import TeacherRepository from '@repository/teacher.repository';
import Teacher from '@models/teacher';

@Service()
export default class TeacherService {

  constructor(
    private readonly teacherRepository: TeacherRepository,
  ) { }

  public getAcceptedTeachers = async (): Promise<Teacher[]> => {
    const teachers = this.teacherRepository.getAcceptedTeachers();
    return teachers;
  }
}