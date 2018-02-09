package asti.csd.recruitment;

import asti.csd.recruitment.utils.NamingConventionUtil;

/** Salutation for representatives and administrators. */
public enum Salutation implements org.springframework.context.MessageSourceResolvable{

        MR,
        MS;

    public Object[] getArguments() {
        return new Object[]{};
    }

    public String[] getCodes() {
        return new String[]{ getClass().getName()+"."+name() };
    }

    public String getDefaultMessage() {
        return name();
    }

    public String getProperName() {
        NamingConventionUtil nc = new NamingConventionUtil();
        return nc.toProperCase(name());
    }

    public String getName() {
      String salutation = this.toString();
      String ret="";
          if(salutation == MR.toString()) {
             ret = "Mr";
          }
          else if(salutation == MS.toString()) {
            ret = "Ms";
          }
          return ret;     
    }

}
