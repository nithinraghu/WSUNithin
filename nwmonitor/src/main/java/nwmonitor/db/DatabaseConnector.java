package nwmonitor.db;


import com.db4o.ObjectContainer;
import com.db4o.ObjectServer;
import com.db4o.cs.Db4oClientServer;


public class DatabaseConnector {
	
	public final static String DB4OFILENAME = System.getProperty("user.home") + "/serverCollection.db4o";
	private static Object lock = new Object();
	private ObjectServer dataBaseServer = null;
	private ObjectContainer clientSession = null;
	private static DatabaseConnector sInstance = null;
	
	private DatabaseConnector()
	{
		if(dataBaseServer == null || clientSession == null )
		{
			initialize();
		}
	}
	
	public static DatabaseConnector getInstance(){
		if (sInstance == null){
			sInstance = new DatabaseConnector();
		}
		return sInstance;
	}
	
	private void initialize()
	{
		synchronized(lock){			
			if (dataBaseServer == null){
				dataBaseServer = Db4oClientServer.openServer(Db4oClientServer
						.newServerConfiguration(), DB4OFILENAME , 0);
			}
			clientSession = dataBaseServer.openClient();											
		}		
	}
	
	public ObjectContainer getConnection()
	{
		return clientSession;
	}
	
	public ObjectServer getDataBaseSever()
	{
		return dataBaseServer;
	}
	
	@Override
	protected void finalize() throws Throwable {		
		 try {
			 clientSession.close();       
			 dataBaseServer.close();
	     } finally {
	         super.finalize();
	     }		
	}

	
}

