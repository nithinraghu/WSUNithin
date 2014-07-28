package nwmonitor.domain;

import java.io.Serializable;
import java.util.UUID;

public class Server implements Serializable{
	static int counter = 0;
	
	static Object lock = new Object();
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String Name;
	private String id;
	
	public Server(String name){
		this.Name = name;
		synchronized (lock) {
			counter++;
			id = "Server/" + counter;
		}
		
	}

	public String getName() {
		return Name;
	}

	public String getId() {
		return id ;
	}
	

}
