package asti.csd.recruitment.utils;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.springframework.jdbc.support.JdbcUtils;

/**
 * Holds conversion methods used by this plugin.
 */
public class NamingConventionUtil {

    /** 
     * Converts a given string with enum case into a normal case
     */
    public static String toProperCase(String str) {
        StringBuilder sb = new StringBuilder();
        char lastChar = '\0';
        int counter = 0;

        for (char c: str.toLowerCase().trim().toCharArray()) {
            if (counter == 0 && Character.isJavaIdentifierStart(c) || (counter > 0 && Character.isJavaIdentifierPart(c))) { 
                if (c != '_') {
                    if (counter == 0) {
                        sb.append(Character.toUpperCase(c));
                    } else
                        if (lastChar != '_') sb.append(c);
                        else sb.append(Character.toUpperCase(c));
                    
                } else sb.append(' ');
                lastChar = c;
            }
            counter++;
        }
        return sb.toString();
    }
}
