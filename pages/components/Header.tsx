import {
    createStyles,
    Header,
    Group,
    Button,
    Box,
    Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { app } from '../../firebaseConfig';
import useAuth from '../../hooks/useAuth';
import router from 'next/router';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        }),
    },
}));

export function HeaderSection() {
    const { classes } = useStyles();
    const { isLoggedIn, user } = useAuth();

    const logout = () => {
        const auth = getAuth(app);
        signOut(auth);
        router.push('/');
    };

    return (
        <Box>
            <Header height={120} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Link href="/" className={classes.link}>
                        <h1>Marsvinsdatabasen</h1>
                    </Link>
                    <Group>
                        {isLoggedIn ? (
                            <>
                                <Avatar
                                    variant="outline"
                                    radius="xl"
                                    size="lg"
                                    color="blue"
                                    data-cy="header-avatar"
                                    src="https://vivopets.com/wp-content/uploads/2021/03/coronet-guinea-pig.jpg"
                                />
                                <Button
                                    variant="default"
                                    onClick={logout}
                                    data-cy="logout-button"
                                >
                                    Logga ut
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="default"
                                        data-cy="login-header-button"
                                    >
                                        Logga in
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button
                                        color="cyan"
                                        data-cy="register-header-button"
                                    >
                                        Registrera dig
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Group>
                </Group>
            </Header>
        </Box>
    );
}
