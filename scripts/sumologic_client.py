import os
import requests
from datetime import datetime, timedelta

class SumoLogicClient:
    def __init__(self):
        self.base_url = "https://long-api.sumologic.net/api/v1"
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
        self.session.auth = (
            os.getenv("SUMO_LOGIC_ACCESS_ID"),
            os.getenv("SUMO_LOGIC_ACCESS_KEY")
        )

    def test_query(self, query):
        """Execute a query in Sumo Logic and check for results"""
        job_id = self._create_search_job(query)
        status = self._wait_for_job(job_id)
        return self._check_results(job_id) if status == "DONE GATHERING RESULTS" else False

    def _create_search_job(self, query):
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=24)
        payload = {
            "query": query,
            "from": start_time.isoformat() + "Z",
            "to": end_time.isoformat() + "Z",
            "timeZone": "UTC"
        }
        response = self.session.post(f"{self.base_url}/search/jobs", json=payload)
        response.raise_for_status()
        return response.json()["id"]

    def _wait_for_job(self, job_id, max_attempts=10):
        for _ in range(max_attempts):
            response = self.session.get(f"{self.base_url}/search/jobs/{job_id}")
            response.raise_for_status()
            status = response.json()["state"]
            if status in ["DONE GATHERING RESULTS", "CANCELLED"]:
                return status
            time.sleep(3)
        return "TIMEOUT"

    def _check_results(self, job_id):
        response = self.session.get(f"{self.base_url}/search/jobs/{job_id}/messages")
        response.raise_for_status()
        return len(response.json()["messages"]) > 0
