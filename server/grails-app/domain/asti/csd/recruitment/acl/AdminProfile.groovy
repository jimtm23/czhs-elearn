package asti.csd.recruitment.acl

import asti.csd.recruitment.Salutation

class AdminProfile implements Serializable {

	/** Salutation of Admin */
	Salutation salutation

	/** First Name of Admin */
	String firstName
	/** Middle Initial of Admin */
	String middleInitial
	/** Last Name of Admin */
	String lastName
	/** Nick Name of Admin */
	String nickName
	/** Position of Admin */
	String position

	/** Admin's Account Data */
	// AdminAccount account
	static hasOne = [account: AdminAccount]

    static constraints = {
    	salutation blank: false, nullable: false
    	firstName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..50, blank: false, nullable: false
    	middleInitial matches: "[A-Za-zÑñ]+", maxSize: 4, blank: true, nullable: true
    	lastName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..50, blank: false, nullable: false
    	nickName matches: "[A-Za-z0-9-. _Ññ]+", size: 2..15, blank: false, nullable: false
    	position matches: /^[\da-zA-Z0-9 \Ñ\ñ\!\@\#\$\%\^\&\*\(\)\_\+\|\~\-\=\\\`\{\}\[\]\:\"\;\'\<\>\?\,\.\/\s]{0,}$/, size: 2..50, blank: false, nullable: false
    	account blank: true, nullable: true
    }

    String getFullName() {
    	return "${firstName.capitalize()}${middleInitial ? ' ' + middleInitial.capitalize() + '. ' : ' '} ${lastName.capitalize()}"
    }
}

