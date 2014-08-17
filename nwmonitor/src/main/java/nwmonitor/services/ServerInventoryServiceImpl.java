package nwmonitor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import nwmonitor.domain.Server;
import nwmonitor.domain.ServerStats;

@Component
public class ServerInventoryServiceImpl implements ServerInventoryService{

	/**
	 *        
	 */
	public List<ServerStats> getAllServers() {		
		
		List<ServerStats> servers = new ArrayList<ServerStats>();
		ServerStats stat1 = new ServerStats("CPU Utilization",5,10,8);
		ServerStats stat2 = new ServerStats("Disk Usage", 3, 5, 7);
		
		/*
		List<Server> servers = new ArrayList<Server>();
		
		
		Server server1 = new Server("10.1.2");
		servers.add(server1);
		Server server2 = new Server("10.20.6.2");
		servers.add(server2);
		
		*/
		return servers;

		
	}

}
