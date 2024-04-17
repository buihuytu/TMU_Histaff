import { PostDateTimePipe } from './post-date-time.pipe';

describe('PostDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new PostDateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
