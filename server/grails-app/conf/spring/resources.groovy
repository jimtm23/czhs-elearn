import asti.csd.recruitment.acl.AdminAccountPasswordEncoderListener
import org.springframework.security.access.vote.RoleHierarchyVoter
// Place your Spring DSL code here
beans = {
    adminAccountPasswordEncoderListener(AdminAccountPasswordEncoderListener)

    def conf = grails.plugin.springsecurity.SpringSecurityUtils.securityConfig
	
	roleVoter(RoleHierarchyVoter, ref('roleHierarchy')) {
        rolePrefix = 'PERM_'
	}
}