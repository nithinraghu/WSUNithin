package nwmonitor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.db4o.Db4oEmbedded;
import com.db4o.ObjectContainer;
import com.db4o.ObjectServer;
import com.db4o.ObjectSet;
import com.db4o.cs.Db4oClientServer;

import nwmonitor.domain.Server;

public class ServerCollection {

	private static ServerCollection sInstance = null;

	public final static String DB4OFILENAME = System.getProperty("user.home")
            + "/serverCollection.db4o";

	private List<Server> servers;
	
	private ObjectServer dataBaseServer = null;
	
	private static Object lock = new Object();
	
	
	public static  ServerCollection getInstance(){
		if (sInstance == null){
			sInstance = new ServerCollection();
		}
		return sInstance;
	}

	private ServerCollection(){
		synchronized(lock){
			ObjectContainer clientSession = null;
			try{
				if (dataBaseServer == null){
					dataBaseServer = Db4oClientServer.openServer(Db4oClientServer
							.newServerConfiguration(), DB4OFILENAME , 0);
				}
				clientSession = dataBaseServer.openClient();
				servers = getAllServersFromDatabase(clientSession);
				if (servers == null || servers.size() == 0){
					initializeServersAndPersist(clientSession);
				}
			}
			finally{
				clientSession.close();
				dataBaseServer.close();
			}
		}
	}

	private void initializeServersAndPersist(ObjectContainer clientSession) {

		for (int i=0;i<10;i++){
			Random r = new Random();
			Server server = new Server(r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256));
			server.scheduleTrackStatus();
			clientSession.store(server);
			servers.add(server);
		}
		
	}
	
	private List<Server> getAllServersFromDatabase(ObjectContainer db){
		List<Server> servers = new ArrayList<Server>();
		ObjectSet<?> result = db.queryByExample(Server.class);
		while(result.hasNext()){
			Server server = (Server)result.next();
			server.scheduleTrackStatus();
			servers.add(server);
		}
		return servers;
		
	}
	
		

	public List<Server> getAllServers(){
		Server sample = servers.get(0);
		System.out.println("Name: "+sample.getName()+"CpuUtilization: "+ sample.getCpuUtilization() +"CpuUtilizationPercent: "+sample.getCpuUtilizationPercent());
		return servers;

	}
}
