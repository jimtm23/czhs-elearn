package asti.csd.recruitment.acl

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Permission implements Serializable {

	private static final long serialVersionUID = 1

	/** Used as reference in spring security authentication. */
	String authority
	/** Description of permission. */
	String description
	/** Flag that tells if the permission is active. */
	boolean enabled = true

	static belongsTo = [parent: Permission]

	static hasMany = [children: Permission]


	Permission(String authority) {
		this()
		this.authority = authority
	}

	static constraints = {
		authority nullable: false, blank: false, unique: true
	}

	static mapping = {
		cache true
	}
}
