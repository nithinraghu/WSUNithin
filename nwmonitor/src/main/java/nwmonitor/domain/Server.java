package nwmonitor.domain;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import com.db4o.Db4oEmbedded;
import com.db4o.ObjectContainer;

import nwmonitor.domain.constants.Thresholds;
import nwmonitor.domain.enums.ServerStatus;
import nwmonitor.services.ServerCollection;

public class Server implements Serializable{
	static int counter = 0;
	
	private ServerStatus cpuUtilization;
	
	private float cpuUtilizationPercent;
	
	private ServerStatus diskUsage;
	
	private float diskUsagePercent;
	
	private ServerStatus networkUtilization;
	
	private float networkUtilizationPercent;
	
	private String Name;
	
	private String id;
	
	private static int STATUS_CHANGE_PERIOD = 1 * 1000;
	
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
	
	}
	
	public void scheduleTrackStatus(){
		TimerTask timerTask = new TimerTaskExample();
		Timer timer = new Timer(true);
		timer.scheduleAtFixedRate(timerTask, 0, STATUS_CHANGE_PERIOD);
	}
	
	private void syncAllStatus(){
		this.cpuUtilization = createNewStatus();
		this.cpuUtilizationPercent = createNewPercent(this.cpuUtilization);
		
		this.diskUsage = createNewStatus();
		this.diskUsagePercent = createNewPercent(this.diskUsage);
		
		this.networkUtilization = createNewStatus();
		this.networkUtilizationPercent = createNewPercent(this.networkUtilization);
		
		//TODO :- Create a ServerStats object. Pass the serverId, cpuUtilizationPercent, diskUsagePercent, diskUsagePercent to the
		// constructor of ServerStats object
		
	}

	private float createNewPercent(ServerStatus status) {
		
		float minX;
		float maxX;
		
		if(status == ServerStatus.CRITICAL)
		{
			minX = Thresholds.CRITICAL_THRESHOLD;
			maxX = 100f;			
		}
		else if (status == ServerStatus.WARNING)
		{
			minX = Thresholds.WARNING_THRESHOLD;
			maxX = Thresholds.CRITICAL_THRESHOLD;						
		}
		else
		{
			minX = 0f;
			maxX = Thresholds.WARNING_THRESHOLD;						
		}
		
		return RANDOM.nextFloat() * (maxX - minX) + minX;
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
	
	public float getCpuUtilizationPercent() {
		return cpuUtilizationPercent;
	}

	public ServerStatus getDiskUsage() {
		return diskUsage;
	}
	
	public float getDiskUsagePercent() {
		return diskUsagePercent;
	}

	public ServerStatus getNetworkUtilization() {
		return networkUtilization;
	}
	
	public float getNetworkUtilizationPercent() {
		return networkUtilizationPercent;
	}
	
	public class TimerTaskExample extends TimerTask {
	    @Override
	    public void run() {
	    	syncAllStatus();
	    }
	}

	

}
