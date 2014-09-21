package nwmonitor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.db4o.Db4oEmbedded;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;

import nwmonitor.domain.Server;

public class ServerCollection {

	private static ServerCollection sInstance = null;

	final static String DB4OFILENAME = System.getProperty("user.home")
            + "/serverCollection.db4o";

	private List<Server> servers;

	public static ServerCollection getInstance(){
		if (sInstance == null){
			sInstance = new ServerCollection();
		}
		return sInstance;
	}

	private ServerCollection(){

		ObjectContainer db = Db4oEmbedded.openFile(Db4oEmbedded
				.newConfiguration(), DB4OFILENAME);
		
		servers = getAllServersFromDatabase(db);
		if (servers == null || servers.size() == 0){
			initializeServersAndPersist(db);
		}
	}

	private void initializeServersAndPersist(ObjectContainer db) {
		try{
			for (int i=0;i<10;i++){
				Random r = new Random();
				Server server = new Server(r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256));
				db.store(server);
				servers.add(server);
			}
		}
		finally{
			db.close();
		}
	}
	
	private List<Server> getAllServersFromDatabase(ObjectContainer db){
		List<Server> servers = new ArrayList<Server>();
		ObjectSet<?> result = db.queryByExample(Server.class);
		while(result.hasNext()){
			servers.add((Server)result.next());
		}
		return servers;
		
	}
	
		

	public List<Server> getAllServers(){
		return servers;
	}
}
