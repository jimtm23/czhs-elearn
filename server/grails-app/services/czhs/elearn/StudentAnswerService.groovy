package czhs.elearn

import grails.gorm.services.Service

@Service(StudentAnswer)
interface StudentAnswerService {

    StudentAnswer get(Serializable id)

    List<StudentAnswer> list(Map args)

    Long count()

    void delete(Serializable id)

    StudentAnswer save(StudentAnswer studentAnswer)

}