import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailSidebar from './ActivityDetailSidebar';

export default observer (function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
      if (id) loadActivity(id);
    }, [id, loadActivity])

    if(loadingInitial || !activity) return <LoadingComponents content={''} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailHeader activity={activity} />
          <ActivityDetailInfo activity={activity} />
          <ActivityDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailSidebar attendees={activity.attendees!}/>
        </Grid.Column>
      </Grid>
    );
})