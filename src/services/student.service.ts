import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import { Service } from "typedi";
import StudentRepository from "@repository/student.repository";
import Student from "@models/student";
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class StudentService {

  constructor(
    @InjectRepository()
    private readonly studentRepository: StudentRepository,
  ) { }

  /**
   * @description email을 통한 학생 조회
   */
  public getStudentByEmail = async (email: string): Promise<Student> => {
    const student = await this.studentRepository.getStudentByEmail(email);

    if (student === undefined) {
      return null;
    }

    return student;
  }

  /**
   * @description idx를 통한 학생 조회
   */
  public getStudentByIdx = async (idx: number): Promise<Student> => {
    const student = await this.studentRepository.findOne(idx);

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