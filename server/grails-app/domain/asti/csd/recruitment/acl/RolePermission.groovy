package asti.csd.recruitment.acl

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class RolePermission implements Serializable {

	private static final long serialVersionUID = 1

	Role role
	Permission permission

	RolePermission(Role g, Permission r) {
		this()
		role = g
		permission = r
	}

	@Override
	boolean equals(other) {
		if (other instanceof RolePermission) {
			other.permissionId == permission?.id && other.roleId == role?.id
		}
	}

	@Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (role) {
            hashCode = HashCodeHelper.updateHash(hashCode, role.id)
		}
		if (permission) {
		    hashCode = HashCodeHelper.updateHash(hashCode, permission.id)
		}
		hashCode
	}

	static RolePermission get(long roleId, long permissionId) {
		criteriaFor(roleId, permissionId).get()
	}

	static boolean exists(long roleId, long permissionId) {
		criteriaFor(roleId, permissionId).count()
	}

	private static DetachedCriteria criteriaFor(long roleId, long permissionId) {
		RolePermission.where {
			role == Role.load(roleId) &&
			permission == Permission.load(permissionId)
		}
	}

	static RolePermission create(Role role, Permission permission, boolean flush = false) {
		def instance = new RolePermission(role: role, permission: permission)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(Role rg, Permission r) {
		if (rg != null && r != null) {
			RolePermission.where { role == rg && permission == r }.deleteAll()
		}
	}

	static int removeAll(Permission r) {
		r == null ? 0 : RolePermission.where { permission == r }.deleteAll() as int
	}

	static int removeAll(Role rg) {
		rg == null ? 0 : RolePermission.where { role == rg }.deleteAll() as int
	}

	static constraints = {
	    role nullable: false
		permission nullable: false, validator: { Permission r, RolePermission rg ->
			if (rg.role?.id) {
				if (RolePermission.exists(rg.role.id, r.id)) {
				    return ['roleGroup.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['role', 'permission']
		version false
	}
}
