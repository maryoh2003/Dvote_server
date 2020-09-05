import { Service } from "typedi";
import StudentRepository from "@repository/student.repository";
import Student from "@models/student";

@Service()
export default class StudentService {

  constructor(
    private readonly studentRepository: StudentRepository,
  ) { }

  /**
   * @description 승인된 학생 전체 조회
   */
  public getAcceptedStudents = async (): Promise<Student[]> => {
    const students = await this.studentRepository.getAcceptedStudents();
    return students;
  }
}