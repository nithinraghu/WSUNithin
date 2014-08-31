package nwmonitor.domain;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import nwmonitor.domain.enums.ServerStatus;

public class Server implements Serializable{
	static int counter = 0;
	
	private ServerStatus cpuUtilization;
	
	private ServerStatus diskUsage;
	
	private ServerStatus networkUtilization;
	
	private String Name;
	
	private String id;
	
	private static int STATUS_CHANGE_PERIOD = 2 * 1000;
	
	private static final List<ServerStatus> VALUES = Collections.unmodifiableList(Arrays.asList(ServerStatus.values()));
	private static final int SIZE = VALUES.size();
	private static final Random RANDOM = new Random();
	
	private ServerStatus createNewStatus(){
		return VALUES.get(RANDOM.nextInt(SIZE));
	}
	
	static Object lock = new Object();
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public Server(String name){
		this.Name = name;
		synchronized (lock) {
			counter++;
			id = "Server/" + counter;
		}
		scheduleTrackStatus();
		
	}
	
	private void scheduleTrackStatus(){
		TimerTask timerTask = new TimerTaskExample();
		Timer timer = new Timer(true);
		timer.scheduleAtFixedRate(timerTask, 0, STATUS_CHANGE_PERIOD);
	}
	
	private void syncAllStatus(){
		this.cpuUtilization = createNewStatus();
		this.diskUsage = createNewStatus();
		this.networkUtilization = createNewStatus();
	}

	public String getName() {
		return Name;
	}

	public String getId() {
		return id ;
	}
	
	public ServerStatus getCpuUtilization() {
		return cpuUtilization;
	}

	public ServerStatus getDiskUsage() {
		return diskUsage;
	}

	public ServerStatus getNetworkUtilization() {
		return networkUtilization;
	}
	
	public class TimerTaskExample extends TimerTask {
	    @Override
	    public void run() {
	    	syncAllStatus();
	    }
	}

	

}
