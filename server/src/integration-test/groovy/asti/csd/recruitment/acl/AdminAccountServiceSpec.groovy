package asti.csd.recruitment.acl

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class AdminAccountServiceSpec extends Specification {

    AdminAccountService adminAccountService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new AdminAccount(...).save(flush: true, failOnError: true)
        //new AdminAccount(...).save(flush: true, failOnError: true)
        //AdminAccount adminAccount = new AdminAccount(...).save(flush: true, failOnError: true)
        //new AdminAccount(...).save(flush: true, failOnError: true)
        //new AdminAccount(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //adminAccount.id
    }

    void "test get"() {
        setupData()

        expect:
        adminAccountService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<AdminAccount> adminAccountList = adminAccountService.list(max: 2, offset: 2)

        then:
        adminAccountList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        adminAccountService.count() == 5
    }

    void "test delete"() {
        Long adminAccountId = setupData()

        expect:
        adminAccountService.count() == 5

        when:
        adminAccountService.delete(adminAccountId)
        sessionFactory.currentSession.flush()

        then:
        adminAccountService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        AdminAccount adminAccount = new AdminAccount()
        adminAccountService.save(adminAccount)

        then:
        adminAccount.id != null
    }
}
