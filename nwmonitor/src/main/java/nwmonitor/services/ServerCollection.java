package nwmonitor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import nwmonitor.domain.Server;

public class ServerCollection {

	private static ServerCollection sInstance = null;
	
	private List<Server> servers;
	
	public static ServerCollection getInstance(){
		if (sInstance == null){
			sInstance = new ServerCollection();
		}
		return sInstance;
	}
	
	private ServerCollection(){
		servers = new ArrayList<Server>();
		
		for (int i=0;i<10;i++){
			Random r = new Random();
			Server server = new Server(r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256));
			servers.add(server);
		}
		
	}
	
	public List<Server> getAllServers(){
		return servers;
	}
}
