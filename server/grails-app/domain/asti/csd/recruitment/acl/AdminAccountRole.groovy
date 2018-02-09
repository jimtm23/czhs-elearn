package asti.csd.recruitment.acl

import grails.gorm.DetachedCriteria
import groovy.transform.ToString
import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class AdminAccountRole implements Serializable {

	private static final long serialVersionUID = 1

	AdminAccount adminAccount
	Role role

	@Override
	boolean equals(other) {
		if (other instanceof AdminAccountRole) {
			other.adminAccountId == adminAccount?.id && other.roleId == role?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (adminAccount) {
            hashCode = HashCodeHelper.updateHash(hashCode, adminAccount.id)
		}
		if (role) {
		    hashCode = HashCodeHelper.updateHash(hashCode, role.id)
		}
		hashCode
	}
	
	static AdminAccountRole get(long adminAccountId, long roleId) {
		criteriaFor(adminAccountId, roleId).get()
	}

	static boolean exists(long adminAccountId, long roleId) {
		criteriaFor(adminAccountId, roleId).count()
	}

	private static DetachedCriteria criteriaFor(long adminAccountId, long roleId) {
		AdminAccountRole.where {
			adminAccount == AdminAccount.load(adminAccountId) &&
			role == Role.load(roleId)
		}
	}

	static AdminAccountRole create(AdminAccount adminAccount, Role role, boolean flush = false) {
		def instance = new AdminAccountRole(adminAccount: adminAccount, role: role)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(AdminAccount u, Role rg) {
		if (u != null && rg != null) {
			AdminAccountRole.where { adminAccount == u && role == rg }.deleteAll()
		}
	}

	static int removeAll(AdminAccount u) {
		u == null ? 0 : AdminAccountRole.where { adminAccount == u }.deleteAll() as int
	}

	static int removeAll(Role rg) {
		rg == null ? 0 : AdminAccountRole.where { role == rg }.deleteAll() as int
	}

	static constraints = {
	    role nullable: false
		adminAccount nullable: false, validator: { AdminAccount u, AdminAccountRole ug ->
			if (ug.role?.id) {
				if (AdminAccountRole.exists(u.id, ug.role.id)) {
					return ['userGroup.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['role', 'adminAccount']
		version false
	}
}
