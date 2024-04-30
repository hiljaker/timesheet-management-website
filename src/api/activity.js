import { queryClient } from "@src/components/providers/TanstackQueryProvider";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const activitiesKey = "activities";
const activityKey = "activity";

const fetchActivities = async (searchQuery) => {
  const { data } = await axios.get("/activity", {
    params: searchQuery,
  });
  return data.result.activities;
};

const useGetActivities = (searchQuery) => {
  return useQuery({
    queryKey: [activitiesKey, searchQuery],
    queryFn: () => fetchActivities(searchQuery),
  });
};

const createActivity = async (payload = { values, activityId }) => {
  const { data } = await axios.post(
    `/activity/${payload.activityId}`,
    payload.values
  );

  return data;
};

const useCreateActivity = () => {
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activitiesKey] });
    },
  });
};

const fetchActivity = async (activityId) => {
  if (activityId) {
    const { data } = await axios.get(`/activity/${activityId}`);
    return data.result.activity;
  }

  return {};
};

const useGetActivity = (activityId) => {
  return useQuery({
    queryKey: [activityKey, activityId],
    queryFn: () => fetchActivity(activityId),
  });
};

const deleteActivity = async (activityId) => {
  const { data } = await axios.delete(`/activity/${activityId}`);
  return data;
};

const useDeleteActivity = () => {
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activitiesKey] });
    },
  });
};

export {
  activitiesKey,
  fetchActivities,
  useGetActivities,
  useCreateActivity,
  activityKey,
  fetchActivity,
  useGetActivity,
  deleteActivity,
  useDeleteActivity,
};
