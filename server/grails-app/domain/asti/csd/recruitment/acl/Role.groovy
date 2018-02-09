package asti.csd.recruitment.acl

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Role implements Serializable {

	private static final long serialVersionUID = 1

	String authority

	Role(String name) {
		this()
		this.authority = name
	}
	
	Set<Permission> getAuthorities() {
		(RolePermission.findAllByRole(this) as List<RolePermission>)*.permission as Set<Permission>
	}

	static constraints = {
		authority nullable: false, blank: false, unique: true
	}

	static mapping = {
		cache true
	}
}
