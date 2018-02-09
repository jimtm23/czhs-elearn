package asti.csd.recruitment.acl


import grails.rest.*
import grails.converters.*
import static org.springframework.http.HttpStatus.*
import grails.validation.Validateable
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON
import asti.csd.recruitment.Salutation

class AdminAccountController extends RestfulController {
    static responseFormats = ['json', 'xml']
    
    def adminAccountService

    AdminAccountController() {
        super(AdminAccount)
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def index() { 
		render adminAccountService.getAdminAccountList() as JSON
    }

    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_LIST'])
    def show() { 
		render adminAccountService.getAdminAccount(params?.id) as JSON
    }

    @Transactional
    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_CREATE'])
    def create() {
        respond new AdminAccount(params), model: [roleList: Role.findAllByAuthorityNotInListAndEnabled(['ROLE_SUPERADMIN','ROLE_VIEW_DASHBOARD'], true), bureauList: Bureau.list(), salutationList: Salutation.values()]
    }

    @Transactional
    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_CREATE'])
    def save(AdminAccountProfile adminAccountProfile) {
        def adminAccount = new AdminAccountCommand(adminAccountProfile.adminAccount)
        def adminProfile = new AdminProfileCommand(adminAccountProfile.adminProfile)

        adminAccount.validate() 
        adminProfile.validate() 
        if (adminAccount.hasErrors() || adminProfile.hasErrors()) {
            respond adminAccount.errors, model: [adminProfile: adminProfile.errors]
        } else {
            try {
                def savedAdminAccount = adminAccountService.saveAdminAccount(adminAccountProfile.adminAccount, adminAccountProfile.adminProfile)
                respond savedAdminAccount
            } catch (Exception BatchUpdateException) {
                respond adminAccount.errors, model: [adminProfile: adminProfile.errors]
            }
        }
    }

    @Transactional
    @Secured(['PERM_ACCOUNT_ALL','PERM_ACCOUNT_CREATE'])
    def update(AdminAccountProfile adminAccountProfile) {
        adminAccountProfile.adminAccount.remove('profile')
        def adminAccount = new AdminAccountCommand(adminAccountProfile.adminAccount)

        def adminProfile = new AdminProfileCommand(adminAccountProfile.adminProfile)
        adminAccount.validate() 
        adminProfile.validate() 
        
        if (adminAccount.hasErrors() || adminProfile.hasErrors()) {
            respond adminAccount.errors, model: [adminProfile: adminProfile.errors]
        } else {
            try {
                def savedAdminAccount = adminAccountService.saveAdminAccount(adminAccountProfile.adminAccount, adminAccountProfile.adminProfile)
                respond savedAdminAccount
            } catch (Exception BatchUpdateException) {
                respond adminAccount.errors, model: [adminProfile: adminProfile.errors]
            }
        }
    }
 }

public class AdminAccountProfile implements Serializable {
    Map adminAccount
    Map adminProfile
}

public class AdminAccountCommand implements Serializable, Validateable {
    Long id
    String username
    String password
    String retypePassword
    Map profile
    
    static constraints = {
        id nullable: true, blank: true
        profile nullable: true, blank: true
        username nullable: false, blank: false, minSize:5, maxSize: 50, matches: "[A-Za-z0-9-. _Ññ]+", validator: { val, obj ->
            if (val?.toLowerCase() == obj.password?.toLowerCase())  return "adminAccountCommand.username.password.matches"
            def account = AdminAccount.executeQuery('select a from AdminAccount a where a.username = :val ', [val:val])
            if (account.id[0] != obj.id) {
                return "adminProfileCommand.username.email.already.taken"
            } 
        }
        password nullable: true, blank: false, minSize: 8, maxSize: 30, matches: /^[\da-zA-Z\Ñ\ñ\!\@\#\$\%\^\&\*\(\)\_\+\|\~\-\=\\\`\{\}\[\]\:\"\;\'\<\>\?\,\.\/]{0,}$/, 
        validator: { val, obj -> 
                     val != obj.retypePassword ? false : true 
                     if (val?.toLowerCase() == obj.username?.toLowerCase())  return "adminAccountCommand.password.username.matches"
                     if (val?.toLowerCase() == obj.username?.toLowerCase())  return "adminAccountCommand.password.username.matches" }
        retypePassword nullable: true, blank: false, minSize: 8, maxSize: 30, matches: /^[\da-zA-Z\Ñ\ñ\!\@\#\$\%\^\&\*\(\)\_\+\|\~\-\=\\\`\{\}\[\]\:\"\;\'\<\>\?\,\.\/]{0,}$/
    }
}

public class AdminProfileCommand implements Serializable, Validateable {
    Long id
    Salutation salutation
    String firstName
    String middleInitial
    String lastName
    String nickName
    String position

    static constraints = {
        id nullable: true, blank: true
        salutation blank: false, nullable: false
        firstName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..50, blank: false, nullable: false
        middleInitial matches: "[A-Za-zÑñ]+", maxSize: 4, blank: true, nullable: true
        lastName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..50, blank: false, nullable: false
        nickName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..15, blank: false, nullable: false
        position matches: /^[\da-zA-Z0-9 \Ñ\ñ\!\@\#\$\%\^\&\*\(\)\_\+\|\~\-\=\\\`\{\}\[\]\:\"\;\'\<\>\?\,\.\/\s]{0,}$/, size: 2..50, blank: false, nullable: false
    }
}