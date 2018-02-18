package czhs.elearn

import grails.rest.*
import grails.converters.*
import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

class StudentAnswerController extends RestfulController  {

    StudentAnswerService studentAnswerService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    StudentAnswerController() {
        super(StudentAnswer)
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond studentAnswerService.list(params), model:[studentAnswerCount: studentAnswerService.count()]
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def show(Long id) {
        respond studentAnswerService.get(id)
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def save(StudentAnswer studentAnswer) {
        if (studentAnswer == null) {
            render status: NOT_FOUND
            return
        }

        try {
            studentAnswerService.save(studentAnswer)
        } catch (ValidationException e) {
            respond studentAnswer.errors, view:'create'
            return
        }
        def kups = ["question":studentAnswer.question.id, "answer": studentAnswer.answer]
        respond kups
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def update(StudentAnswer studentAnswer) {
        if (studentAnswer == null) {
            render status: NOT_FOUND
            return
        }

        try {
            studentAnswerService.save(studentAnswer)
        } catch (ValidationException e) {
            respond studentAnswer.errors, view:'edit'
            return
        }

        respond studentAnswer, [status: OK, view:"show"]
    } 

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        studentAnswerService.delete(id)

        render status: NO_CONTENT
    }
}
