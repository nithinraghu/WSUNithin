package nwmonitor.services;

import java.util.List;

import nwmonitor.domain.Server;
import nwmonitor.domain.ServerStats;

public interface ServerInventoryService {
	
	List<ServerStats> getAllServers();

}
