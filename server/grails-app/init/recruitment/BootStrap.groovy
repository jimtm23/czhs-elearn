package recruitment

import asti.csd.recruitment.acl.*
import asti.csd.recruitment.Salutation

class BootStrap {

    def init = { servletContext ->
    	// def role1 = new Permission(authority:"ROLE_ADMIN").save flush:true
	    // def user1 = new AdminAccount(username:"admin",password:"admin").save flush:true
	    // AdminAccountPermission.create(user1,role1)

	    /** Account Permission */
	    def perm_account_all = new Permission(id: 2, authority: 'PERM_ACCOUNT_ALL', description: 'All Admin Account Permissions')
	    def perm_account_create = new Permission(id: 3, authority: 'PERM_ACCOUNT_CREATE', description: 'Permission to create an account', parent: perm_account_all)
	    def perm_account_update = new Permission(id: 4, authority: 'PERM_ACCOUNT_UPDATE', description: 'Permission to update an account', parent: perm_account_all)
	    def perm_account_activate = new Permission(id: 5, authority: 'PERM_ACCOUNT_ACTIVATE', description: 'Permission to activate an account', parent: perm_account_all)
	    def perm_account_deactivate = new Permission(id: 6, authority: 'PERM_ACCOUNT_DEACTIVATE', description: 'Permission to deactivate an account', parent: perm_account_all)
	    def perm_account_view = new Permission(id: 7, authority: 'PERM_ACCOUNT_VIEW', description: 'Permission to view an account', parent: perm_account_all)
	    def perm_account_list = new Permission(id: 8, authority: 'PERM_ACCOUNT_LIST', description: 'Permission to view list of accounts', parent: perm_account_all)
	    def perm_account_password_reset = new Permission(id: 9, authority: 'PERM_ACCOUNT_PASSWORD_RESET', description: 'Permission to reset password of an account', parent: perm_account_all)
	    
	    def role_superadmin = new Role(id: 1, authority: 'ROLE_SUPERADMIN', description: 'ROLE_SUPERADMIN')
	    def role_administrator = new Role(id: 1, authority: 'ROLE_ADMINISTRATOR', description: 'ROLE_ADMINISTRATOR')

	    def profile_superadmin = new AdminProfile(salutation: Salutation.MR, firstName: 'Juan', lastName: 'dela Cruz', nickName: 'jun', position: 'superadmin')
	    def profile_administrator = new AdminProfile(salutation: Salutation.MR, firstName: 'Pedro', lastName: 'Padua', nickName: 'peds', position: 'administrator')

	    def account_superadmin = new AdminAccount(username: 'sulayman@asti.dost.gov.ph', password: "p8uBaD5u_u#+ewa2p", enabled: true, profile: profile_superadmin)
	    def account_administrator = new AdminAccount(username: 'administrator@asti.dost.gov.ph', password: "p8uBaD5u_u#+ewa2p", enabled: true, profile: profile_administrator)

	    perm_account_all.save flush:true, failOnError:true
		perm_account_create.save flush:true, failOnError:true
		perm_account_update.save flush:true, failOnError:true
		perm_account_activate.save flush:true, failOnError:true
		perm_account_deactivate.save flush:true, failOnError:true
		perm_account_view.save flush:true, failOnError:true
		perm_account_list.save flush:true, failOnError:true
		perm_account_password_reset.save flush:true, failOnError:true

		def superAdminPerms = [
			/** Account Permission */
			perm_account_all,
			perm_account_create,
			perm_account_update,
			perm_account_activate,
			perm_account_deactivate,
			perm_account_view,
			perm_account_list,
			perm_account_password_reset
		]

		role_superadmin.save flush:true, failOnError:true
		profile_superadmin.save flush:true, failOnError:true
		account_superadmin.save flush:true, failOnError:true
		
		role_administrator.save flush:true, failOnError:true
		profile_administrator.save flush:true, failOnError:true
		account_administrator.save flush:true, failOnError:true

		superAdminPerms.each { perm -> 
        	RolePermission.create(role_superadmin, perm, true)
        	RolePermission.create(role_administrator, perm, true)
    	}

    	AdminAccountRole.create(account_superadmin, role_superadmin, true)
    	AdminAccountRole.create(account_administrator, role_administrator, true)

    }
    def destroy = {
    }
}
