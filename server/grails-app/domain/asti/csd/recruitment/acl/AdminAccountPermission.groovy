package asti.csd.recruitment.acl

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class AdminAccountPermission implements Serializable {

	private static final long serialVersionUID = 1

	AdminAccount adminAccount
	Permission permission

	@Override
	boolean equals(other) {
		if (other instanceof AdminAccountPermission) {
			other.adminAccountId == adminAccount?.id && other.permissionId == permission?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (adminAccount) {
            hashCode = HashCodeHelper.updateHash(hashCode, adminAccount.id)
		}
		if (permission) {
		    hashCode = HashCodeHelper.updateHash(hashCode, permission.id)
		}
		hashCode
	}

	static AdminAccountPermission get(long adminAccountId, long permissionId) {
		criteriaFor(adminAccountId, permissionId).get()
	}

	static boolean exists(long adminAccountId, long permissionId) {
		criteriaFor(adminAccountId, permissionId).count()
	}

	private static DetachedCriteria criteriaFor(long adminAccountId, long permissionId) {
		AdminAccountPermission.where {
			adminAccount == AdminAccount.load(adminAccountId) &&
			permission == Permission.load(permissionId)
		}
	}

	static AdminAccountPermission create(AdminAccount adminAccount, Permission permission, boolean flush = false) {
		def instance = new AdminAccountPermission(adminAccount: adminAccount, permission: permission)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(AdminAccount u, Permission r) {
		if (u != null && r != null) {
			AdminAccountPermission.where { adminAccount == u && permission == r }.deleteAll()
		}
	}

	static int removeAll(AdminAccount u) {
		u == null ? 0 : AdminAccountPermission.where { adminAccount == u }.deleteAll() as int
	}

	static int removeAll(Permission r) {
		r == null ? 0 : AdminAccountPermission.where { permission == r }.deleteAll() as int
	}

	static constraints = {
	    adminAccount nullable: false
		permission nullable: false, validator: { Permission r, AdminAccountPermission ur ->
			if (ur.adminAccount?.id) {
				if (AdminAccountPermission.exists(ur.adminAccount.id, r.id)) {
				    return ['userRole.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['adminAccount', 'permission']
		version false
	}
}
