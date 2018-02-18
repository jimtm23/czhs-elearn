package czhs.elearn

import grails.rest.*
import grails.converters.*
import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

class ExamController extends RestfulController {

    ExamService examService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    ExamController() {
        super(Exam)
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond examService.list(params), model:[examCount: examService.count()]
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def show(Long id) {
        respond examService.get(id)
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def save(Exam exam) {
        if (exam == null) {
            render status: NOT_FOUND
            return
        }

        try {
            examService.save(exam)
        } catch (ValidationException e) {
            respond exam.errors, view:'create'
            return
        }

        respond exam, [status: CREATED, view:"show"]
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def update(Exam exam) {
        if (exam == null) {
            render status: NOT_FOUND
            return
        }

        try {
            examService.save(exam)
        } catch (ValidationException e) {
            respond exam.errors, view:'edit'
            return
        }

        respond exam, [status: OK, view:"show"]
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        examService.delete(id)

        render status: NO_CONTENT
    }
}
