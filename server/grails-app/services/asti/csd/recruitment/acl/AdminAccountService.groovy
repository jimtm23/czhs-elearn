package asti.csd.recruitment.acl

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class AdminAccountService {

	def getAdminAccountList() {
		def adminAccountList = []

		def superAdminRole = Role.findByAuthority("ROLE_SUPERADMIN")
		def superadmin     = AdminAccountRole.findByRole(superAdminRole)?.adminAccount
		AdminAccount.executeQuery("select aa from AdminAccount as aa where aa.id != :id",[id: superadmin?.id]).each {
			Map adminAccountMap = [:]
			adminAccountMap.id = it?.id
			adminAccountMap.username = it?.username
			adminAccountMap.profile = ["id":it?.profile?.id,"salutation":it?.profile?.salutation?.name, "firstName":it?.profile?.firstName, "middleInitial":it?.profile?.middleInitial, "lastName":it?.profile.lastName, "nickName": it?.profile?.nickName, "position":it?.profile?.position]
			adminAccountList.push(adminAccountMap)
		}
		adminAccountList
	}

	def getAdminAccount(String id) {
		Map adminAccountMap = [:]
		AdminAccount.executeQuery("select aa from AdminAccount as aa where aa.id = :id",[id: id.toLong()]).each {
			adminAccountMap.id = it?.id
			adminAccountMap.username = it?.username
			adminAccountMap.profile = ["id":it?.profile?.id,"salutation":it?.profile?.salutation.name.toUpperCase(), "firstName":it?.profile?.firstName, "middleInitial":it?.profile?.middleInitial, "lastName":it?.profile.lastName, "nickName": it?.profile?.nickName, "position":it?.profile?.position]
		}
		return adminAccountMap
	}

	def saveAdminAccount(Map adminAccountInstance, Map adminProfileInstance) {
		def saveAdminProfile
		def saveAdminAccount
		if (adminAccountInstance?.id) {
			saveAdminAccount = AdminAccount.get(adminAccountInstance?.id.toLong())
			saveAdminProfile = saveAdminAccount.profile
		} else {
			saveAdminProfile = new AdminProfile()
			saveAdminAccount = new AdminAccount()
		}
		saveAdminProfile.with {
			salutation    = adminProfileInstance?.salutation
			firstName     = adminProfileInstance?.firstName
			middleInitial = adminProfileInstance?.middleInitial ?: null
			lastName      = adminProfileInstance?.lastName
			nickName      = adminProfileInstance?.nickName
			position      = adminProfileInstance?.position
		}
		saveAdminProfile.save(flush: true, failOnError: true)

		
		saveAdminAccount.with {
			username = adminAccountInstance?.username
			password     = adminAccountInstance?.password
			profile      = saveAdminProfile
		}
		saveAdminAccount.save(flush: true, failOnError: true)

		return saveAdminAccount
	}

}