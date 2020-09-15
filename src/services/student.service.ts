import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import { Service } from "typedi";
import StudentRepository from "@repository/student.repository";
import Student from "@models/student";

@Service()
export default class StudentService {

  constructor(
    private readonly studentRepository: StudentRepository,
  ) { }

  public getStudent = async (email: string): Promise<Student> => {
    const student = await this.studentRepository.findOne(email);

    if (student === undefined) {
      return null;
    }

    return student;
  }
  /**
   * @description 승인된 학생 전체 조회
   */
  public getAcceptedStudents = async (): Promise<Student[]> => {
    const students = await this.studentRepository.getAcceptedStudents();
    return students;
  }
}